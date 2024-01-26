import axios from 'axios';

export const uploadFile = async (path: string, file: File): Promise<void> => {
  await axios.put(path, file, { headers: { 'Content-Type': file.type } });
};
