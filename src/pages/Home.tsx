import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonImg
} from "@ionic/react";
import React from "react";
import "./Home.css";

import {
  FileTransfer,
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Capacitor } from "@capacitor/core";

const Home: React.FC = () => {
  const [theImage, setImage] = React.useState<string | undefined>();

  const download = () => {
    console.log("download");
    let fileTransfer = FileTransfer.create();
    const url =
      "https://www.postfun.com/wp-content/uploads/2019/09/Hickory-horned-devil-82819.jpg";
    fileTransfer.download(url, File.tempDirectory + "file.jpg", true).then(
      async entry => {
        console.log("download complete: " + entry.toURL());

        // need to convert url so you dont get permission errors...
        setImage(Capacitor.convertFileSrc(File.tempDirectory + "file.jpg"));
      },
      error => {
        // handle error
        console.log("error", error);
      }
    );
  };

return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Capacitor React</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonToolbar>
        <h2>FileTransfer Plugin Test</h2>
      </IonToolbar>
      <IonImg src={theImage}></IonImg>
      <IonItem className="ion-text-wrap">
        <IonLabel>{theImage}</IonLabel>
      </IonItem>
      <div>
        <IonButton onClick={() => download()}>DOWNLOAD</IonButton>
      </div>
    </IonContent>
  </IonPage>
);
};

export default Home;
