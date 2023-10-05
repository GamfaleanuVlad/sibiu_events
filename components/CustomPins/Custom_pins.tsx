import L from "leaflet";
import foootballPin from "/public/static/images/Pins/Football.png"
import shadowPin from "/public/static/images/Pins/Football_shadow.png"
import BasketballPin from "public/static/images/Pins/Basketball.png"
import TennisPin from "public/static/images/Pins/Tennisball.png"
import DancePin from "public/static/images/Pins/Dance.png"
import TheaterPin from "public/static/images/Pins/Theater.png"
import BeerPin from "public/static/images/Pins/Beer.png"

export const  FootballIcon = L.Icon.extend({
    options: {
        iconUrl: foootballPin.src,
        shadowUrl: shadowPin.src,
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [10, 75],
        popupAnchor:  [-3, -76]
    }
});

export const  BasketballIcon = L.Icon.extend({
    options: {
        iconUrl: BasketballPin.src,
        shadowUrl: shadowPin.src,
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [10, 75],
        popupAnchor:  [-3, -76]
    }
});

export const  TennisIcon = L.Icon.extend({
    options: {
        iconUrl: TennisPin.src,
        shadowUrl: shadowPin.src,
        iconSize:     [60, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [10, 75],
        popupAnchor:  [-3, -76]
    }
});

export const  DanceIcon = L.Icon.extend({
    options: {
        iconUrl: DancePin.src,
        shadowUrl: shadowPin.src,
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [10, 75],
        popupAnchor:  [-3, -76]
    }
});

export const  TheaterIcon = L.Icon.extend({
    options: {
        iconUrl: TheaterPin.src,
        shadowUrl: shadowPin.src,
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [10, 75],
        popupAnchor:  [-3, -76]
    }
});

export const  BeerIcon = L.Icon.extend({
    options: {
        iconUrl: BeerPin.src,
        shadowUrl: shadowPin.src,
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [10, 75],
        popupAnchor:  [-3, -76]
    }
});


