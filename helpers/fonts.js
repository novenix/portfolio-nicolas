import FontFaceObserver from 'fontfaceobserver'
const Fonts =()=>{

    const titilliumWeb =new FontFaceObserver('TitilliumWeb')
    titilliumWeb.load().then(()=>{
        document.documentElement.classList.add('titilliumWeb-loaded')
    })
}
export default Fonts;