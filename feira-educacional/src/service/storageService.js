import { supabase } from "../config/supabase";

export const storageService = {
  async listarArquivos() {
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      console.error("Erro ao listar buckets:", bucketsError);
    } else {
      console.log("Buckets:", buckets);
    }

    const { data: files, error: filesError } = await supabase.storage.from("files").list();

    if (filesError) {
      console.error("Erro ao listar arquivos:", filesError);
    } else {
      console.log("Arquivos:", files);
    }
  },
  async uploadFile (file, folder) {
    const filePathBucket = `${folder}/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('files')
    .upload(filePathBucket, file);

  if (error) {
    console.error("Erro no upload:", error);
    return null;
  }

  return data; 
},

};
