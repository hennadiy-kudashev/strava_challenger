import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS
} from '../constants/Page'

export function getPhotos(year) {

    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year
        });

        function getPhotos(year) {
            var items = [];
            for(var i = 0; i < year - 2010; i++){
                items.push(i);
            }
            return items;
        }

        setTimeout(() => {
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: getPhotos(year)
            })
        }, 1000)
    }
}