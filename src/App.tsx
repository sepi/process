import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listOutline, constructOutline } from 'ionicons/icons';
import ProcessManager from './pages/ProcessManager';
import Tab2 from './pages/Tab2';

import { createContext } from 'react';
import { Storage } from '@ionic/storage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

let store: any = undefined;
async function initStorage() {
    store = new Storage();
    await store.create();
}

initStorage();

export const StorageContext = createContext(store);

const App: React.FC = () => {
    return (
        <StorageContext.Provider value={store}>
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/process">
                                <ProcessManager />
                            </Route>
                            <Route exact path="/settings">
                                <Tab2 />
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/process" />
                            </Route>
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="process" href="/process">
                                <IonIcon icon={listOutline} />
                                <IonLabel>Processes</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="settings" href="/settings">
                                <IonIcon icon={constructOutline} />
                                <IonLabel>Settings</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        </StorageContext.Provider>
    );
};

export default App;
