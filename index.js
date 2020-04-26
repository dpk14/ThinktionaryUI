import { AppRegistry } from 'react-native';
import App from './controller/App';
import Initializer from "./controller/Initializer";
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Initializer);
