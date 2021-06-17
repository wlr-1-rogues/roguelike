import React from 'react'

class Equip {
    equipped = {}

    equip(item) {
        this.equipped = item
    }
    render() {
        return (
            <div>{this.equipped.name}</div>
        )
    }
}

export default Equip