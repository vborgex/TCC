import { supabase } from "../config/supabase";

export const storageService = {
  async listarArquivos() {
    const { data: buckets, error: bucketsError } =
      await supabase.storage.listBuckets();
    if (bucketsError) {
      console.error("Erro ao listar buckets:", bucketsError);
    } else {
      console.log("Buckets:", buckets);
    }

    const { data: files, error: filesError } = await supabase.storage
      .from("files")
      .list();

    if (filesError) {
      console.error("Erro ao listar arquivos:", filesError);
    } else {
      console.log("Arquivos:", files);
    }
  },
  async uploadFile(file, folder) {
    try {
      const filePath = `${folder}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("files")
        .upload(filePath, file);

      if (error) throw error;

      const publicUrl = supabase
        .storage
        .from("files")
        .getPublicUrl(filePath).data.publicUrl;

      return {
        name: file.name,
        path: filePath,
        url: publicUrl,
        uploadedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Erro no upload:", error);
      throw error;
    }
  }
};
