import { IonContent, IonHeader, IonPage,
         IonTitle, IonToolbar, IonList,
         IonItem, IonLabel, IonIcon,
         IonFab, IonFabButton} from '@ionic/react';
import { gitNetworkOutline, add } from 'ionicons/icons';
import './ProcessList.css';

import { useState, useContext } from 'react';
import { NavContext } from '@ionic/react';

export interface IProcessStep {
    name: string,
}

export interface IProcess {
    name: string,
    id: number,
    steps: Array<IProcessStep>,
}

interface IProcessProps {
    process: IProcess,
}

const Process: React.FC<IProcessProps> = ({process}) => {
    const { navigate } = useContext(NavContext);

    const onClick = (e: any, process: IProcess) => {
        e.preventDefault();
        navigate(`/process/${process.id}`);
    }

    return (
        <IonItem href={`/process/${process.id}`}
                 onClick={(e) => onClick(e, process)}>
            <IonIcon icon={gitNetworkOutline} />
            <IonLabel>
                {process.name}
            </IonLabel>
        </IonItem>
    );
};

interface IProcessListProps {
    processes: Array<IProcess>,
};

const ProcessList: React.FC<IProcessListProps> = (props: IProcessListProps) => {
    const { navigate } = useContext(NavContext);

    const onCreateClick = (e: any) => {
        e.preventDefault();
        navigate('/process/create');
    }

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Processes</IonTitle>
              </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>
              { props.processes.length > 0 ? 
                <IonList>
                    {
                        props.processes.map(p => <Process key={p.id} process={p}/>)
                    }
                </IonList>
                :
                <IonLabel>No processes define. Create a new one by clicking on the + button.</IonLabel>
              }

              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                  <IonFabButton href="/process/create"
                                onClick={onCreateClick}>
                      <IonIcon icon={add} />
                  </IonFabButton>
              </IonFab>
          </IonContent>
      </IonPage>
  );
};

export default ProcessList;
