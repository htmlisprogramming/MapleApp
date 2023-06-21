function StarforceCount(props){

    return (
        <div className="starSim_item_stars">
            {props.limit >= 5
            ?
            <div>
                <div className={`starSim_item_star ${props.val >= 1 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 2 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 3 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 4 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 5 ? 'on':""}`}></div>
            </div>
            :<></>}
            {props.limit == 8
            ?
            <div>
                <div className={`starSim_item_star ${props.val >= 6 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 7 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 8 ? 'on':""}`}></div>

            </div>
            :<></>}
            {props.limit >= 10
            ?
            <div>
                <div className={`starSim_item_star ${props.val >= 6 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 7 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 8 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 9 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 10 ? 'on':""}`}></div>
            </div>
            :<></>}
            {props.limit >= 15
            ?
            <div>
                <div className={`starSim_item_star ${props.val >= 11 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 12 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 13 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 14 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 15 ? 'on':""}`}></div>
            </div>
            :<></>}
            {props.limit >= 20
            ?
            <div>
                <div className={`starSim_item_star ${props.val >= 16 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 17 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 18 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 19 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 20 ? 'on':""}`}></div>
            </div>
            :<></>}
            {props.limit >= 25
            ?
            <div>
                <div className={`starSim_item_star ${props.val >= 21 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 22 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 23 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 24 ? 'on':""}`}></div>
                <div className={`starSim_item_star ${props.val >= 25 ? 'on':""}`}></div>
            </div>
            :<></>}

        </div>
    )}
export default StarforceCount;