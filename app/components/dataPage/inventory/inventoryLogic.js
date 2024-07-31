import { firestore } from "../../../../firebase";
import { collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

// Fetches all items from the inventory collection with optional search query
export const fetchInventory = async (searchQuery = '') => {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const q = query(collection(firestore, 'inventory'));
  const querySnapshot = await getDocs(q);
  let inventoryList = [];
  querySnapshot.forEach((doc) => {
    inventoryList.push({ 
      name: doc.id, 
      count: doc.data().count, 
      expirationDate: doc.data().expirationDate || '', // Ensure expirationDate has a default value
      category: doc.data().category || 'Uncategorized', // Ensure category has a default value
      calories: doc.data().calories || 0, // Ensure calories has a default value
    });
  });
  if (normalizedQuery) {
    inventoryList = inventoryList.filter(item => item.name.includes(normalizedQuery));
  }
  return inventoryList;
};

// Fetch food data from USDA API (without image and price)
const fetchFoodData = async (foodName) => {
  const apiKey = process.env.NEXT_PUBLIC_USDA_API_KEY;
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${foodName}`);
  const data = await response.json();
  
  // Process the first result
  if (data.foods.length > 0) {
    const food = data.foods[0];
    const { description, foodCategory, foodNutrients } = food;
    const calories = foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value;

    return {
      name: description,
      category: foodCategory,
      calories,
    };
  } else {
    throw new Error('Food not found');
  }
};

// Adds item to the inventory collection
export const addItemToInventory = async (item, expirationDate) => {
  const normalizedItem = item.trim().toLowerCase();
  const inventory = await fetchInventory();

  const docRef = doc(firestore, 'inventory', normalizedItem);
  const docSnap = await getDoc(docRef);

  try {
    const foodData = await fetchFoodData(normalizedItem);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { ...foodData, count: count + 1, expirationDate: expirationDate || '' });
    } else {
      await setDoc(docRef, { ...foodData, count: 1, expirationDate: expirationDate || '' });
    }
  } catch (error) {
    console.error("Error fetching food data:", error);
    if (!docSnap.exists()) {
      await setDoc(docRef, { name: normalizedItem, count: 1, expirationDate: expirationDate || '' });
    }
  }
  
  return fetchInventory();
};

// Removes item or decreases its quantity in the inventory collection
export const removeItemFromInventory = async (item) => {
  const normalizedItem = item.trim().toLowerCase();
  const inventory = await fetchInventory();

  const docRef = doc(firestore, 'inventory', normalizedItem);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { count } = docSnap.data();
    if (count > 1) {
      await setDoc(docRef, { name: normalizedItem, count: count - 1 });
    } else {
      await deleteDoc(docRef);
    }

    return fetchInventory();
  }
};
