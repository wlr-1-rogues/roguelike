// import { createContext } from "react";

// export const HexContext = createContext()

// export const HexProvider = (props) => {

    const normal = "#FFFFFF"
    const warning = "#FF6B4C"
    const consumable = "#48FF47"
    const story = "#CACACA"
    const equip = "#FFD426"
    const inspect = "#00A5D8"
    const pickup = "#3AD1FF"
    const monsterDeath = "#08E000"
    const monsterAttack = "#CA0000"
    const playerAttack = "#7C84FF"


//   return (
//       <HexContext.Provider value={{
//           warning,
//           consumable,
//           story,
//           equip,
//           inspect,
//           pickup
//       }}>
//           {props.children}
//       </HexContext.Provider>
//   )
// }

// export default HexContext

// add this to the top of your class component
    // static contextType = HexContext

// add this to your function within the class component
    // const {...hex} = this.context