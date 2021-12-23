import { IonContent, IonHeader, IonPage,
         IonTitle, IonToolbar, IonList,
         IonItem, IonLabel, IonIcon,
         IonFab, IonFabButton, IonButtons, IonBackButton} from '@ionic/react';
import { add } from 'ionicons/icons';

import { useRouteMatch } from 'react-router-dom';

import { IProcess } from './ProcessList';

interface IProcessDetailProps {
    processes: Array<IProcess>
}

const ProcessDetail: React.FC<IProcessDetailProps> = ({processes}) => {
    const match = useRouteMatch("/process/:id");

    if (match) {
        const pId: number = (match as any).params['id'];
        const process: IProcess = processes.find(p => p.id == pId) as IProcess;

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/process" />
                        </IonButtons>
                        <IonTitle>{process.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        {
                            process.steps.map(s =>
                                <IonItem key={s.name}>
                                    <IonLabel>
                                        {s.name}
                                    </IonLabel>
                                </IonItem>
                            )
                        }
                    </IonList>

                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton href="/process/1/steps/add">
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        );
    } else return null;
};

export default ProcessDetail;
