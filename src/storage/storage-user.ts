import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storage-config";
import { User } from "@dtos/user";

export async function storageUserSave(user: User) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const userStorage = await AsyncStorage.getItem(USER_STORAGE);

  const user: User = userStorage ? JSON.parse(userStorage) : {};

  return user;
}

export async function storageUserDelete() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
