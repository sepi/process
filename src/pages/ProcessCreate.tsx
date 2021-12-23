import { useState, useContext } from 'react';
import { NavContext } from '@ionic/react';

import { IonContent, IonHeader, IonPage,
         IonTitle, IonToolbar,
         IonItem, IonLabel, IonInput, IonButton,
         IonButtons, IonBackButton} from '@ionic/react';

import { IProcess } from './ProcessList';

interface IProcessCreateProps {
    onCreate: (newProcess: IProcess) => void,
    lastId: number,
}

const ProcessCreate: React.FC<IProcessCreateProps> = ({onCreate, lastId}) => {
    const { navigate } = useContext(NavContext);
    const [name, setName] = useState('');

    const onClick = () => {
        onCreate({
            id: lastId+1,
            name: name,
            steps: [
                {name: 'Start'},
                {name: 'End'}
            ],
        });
        setName('');
        navigate('/process');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/process" />
                    </IonButtons>
                    <IonTitle>Create new process</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={name} onIonChange={(e) => setName(e.detail.value as string) } />
                </IonItem>

            </IonContent>

            <IonButton onClick={onClick}>Create</IonButton>
        </IonPage>
    );
};

export default ProcessCreate;
