import Pageheader from '../Pageheader';
import EquipmentTab from './EquipmentTab';
import "./Equipment.css"

function EquipmentSet(){
    return (
        <div>
            <Pageheader 
                title ="장비세팅 계산기"
                description = "장비 템셋팅의 스탯 수치를 계산합니다."
                icon = "equipment_h"/>
            <div className='page_container'>
                <EquipmentTab />
                {/* <div className="equip_select">
                    <input type="number"></input>
                </div> */}
            </div>
            <div className="page_footer"/>
        </div>
    )}
export default EquipmentSet;