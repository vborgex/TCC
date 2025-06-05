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
};
