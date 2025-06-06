import { supabase } from "../config/supabase";
import { AuthService } from "./authService";

export const storageService = {
  sanitizeFileName(filename) {
    return filename
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_");
  },
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
  async uploadFile(file, folder, creatorId) {
    try {
      const sanitizedFilename = this.sanitizeFileName(file.name);
      const filePath = `${folder}/${Date.now()}_${sanitizedFilename}`;

      const { data, error } = await supabase.storage
        .from("files")
        .upload(filePath, file, {
          upsert: true,
          cacheControl: "3600",
          contentType: file.type,
          metadata: {
            creatorId: creatorId,
          },
        });

      if (error) throw error;

      const publicUrl = supabase.storage.from("files").getPublicUrl(filePath)
        .data.publicUrl;

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
  },
  async deleteFile(path) {
    try {
      const { data, error } = await supabase.storage
        .from("files")
        .remove([path]);

      if (error) {
        console.error("Erro ao deletar arquivo:", error);
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
};
