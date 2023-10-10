import InputField from "../components/InputField"
import ListeningAnimation from "../components/listening"
export default prompt=()=>{
    return(
        <div className="Prompt background-image">
            <ListeningAnimation/>
            <InputField/>
        </div>
    )
}