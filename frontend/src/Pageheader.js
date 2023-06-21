function Pageheader(props){
    return (
        <div>
            <div className = "page_header">
                <div className = {"page_icon " + props.icon}/>
                <span className = "page_title">
                    {props.title}
                </span>
                <span className = "page_description">
                    {props.description}
                </span>
            </div>
        </div>
    )}
export default Pageheader;