import { proxy } from 'valtio'

const state = proxy({
  colors: ['#E43F6F', '#726DE8', '#EF674E', '#353934', '#F694C1', '#EDE7B1', '#B26E63', '#654C4F', '#373F51'],
  decals: ['logo1', 'logo2', 'logo3', 'logo4'],
  color: '#373F51',
  decal: 'logo4'
})

export { state }
