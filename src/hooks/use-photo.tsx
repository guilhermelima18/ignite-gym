import { useCallback, useState } from "react";
import { useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

type UsePhotoProps = {
  defaultImageURL: string;
};

export function UsePhoto({ defaultImageURL }: UsePhotoProps) {
  const [userPhoto, setUserPhoto] = useState<string>(defaultImageURL);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();

  const handleUserPhotoSelect = useCallback(async () => {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      if (photoSelected?.assets[0]?.uri) {
        const photoInfo = (await FileSystem.getInfoAsync(
          photoSelected?.assets[0]?.uri
        )) as any;

        if (photoInfo?.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Selecione uma de até 5mb.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        setUserPhoto(photoSelected?.assets[0]?.uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }, []);

  return {
    userPhoto,
    photoIsLoading,
    handleUserPhotoSelect,
  };
}
