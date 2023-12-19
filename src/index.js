import { createRoot } from 'react-dom/client'
import './styles.css'
import { CanvasApp as Canvas } from './canvas'
import { Configurator } from './configurator'

createRoot(document.getElementById('root')).render(
  <>
    <Canvas />
    <Configurator />
  </>
)
