import L from 'leaflet'

export const createHospitalIcon = (available, isActive) => {
    const color = (!isActive || available === 0) ? 'gray' : 'green'
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    })
}

export const createPatientIcon = () => {
    return L.divIcon({
        className: 'patient-icon',
        html: `
            <div style="position: relative; width: 20px; height: 20px;">
                <div class="animate-ping" style="background-color: #ef4444; width: 100%; height: 100%; border-radius: 50%; position: absolute;"></div>
                <div style="background-color: #b91c1c; width: 20px; height: 20px; border-radius: 50%; position: absolute; border: 2px solid white;"></div>
            </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    })
}
