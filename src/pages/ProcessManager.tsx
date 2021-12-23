import { useState, useEffect, useContext } from 'react';

import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';

import ProcessList from './ProcessList';
import ProcessCreate from './ProcessCreate';
import ProcessDetail from './ProcessDetail';

import { IProcess } from './ProcessList';

import { StorageContext } from '../App';


const ProcessManager: React.FC = () => {
    const storage = useContext(StorageContext);

    const [processes, setProcesses] = useState([] as Array<IProcess>);
    const [lastId, setLastId] = useState(0);

    const onCreate = (newProcess: IProcess) => {
        const processesNew = processes.concat(newProcess);
        console.log(processesNew);
        setProcesses(processesNew);
        setLastId(newProcess.id);
    };

    // Every time processes change
    useEffect(() => {
        const asy = async () => {
            await storage.set('processes', processes);
            console.log('Set to storage', processes);
        }
        asy();
    }, [processes]);

    // First mount => fetch processes from storage
    useEffect(() => {
        const asy = async () => {
            const processesFromStorage = await storage.get('processes');
            if (processesFromStorage) {
                console.log('Loaded from storage', processesFromStorage);
                setProcesses(processesFromStorage);
            }
        }
        asy();
    }, []);

    return (
        <IonRouterOutlet>
            <Route path="/process/:id">
                <ProcessDetail processes={processes} />
            </Route>
            <Route exact path="/process">
                <ProcessList processes={processes} />
            </Route>
            <Route exact path="/process/create">
                <ProcessCreate onCreate={onCreate} lastId={lastId} />
            </Route>
        </IonRouterOutlet>
    );
};

export default ProcessManager;
