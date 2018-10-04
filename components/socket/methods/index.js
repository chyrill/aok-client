/* eslint-disable */

export const TRANSFROM_DATA_TO_NOTIFICATION_PLACE_ORDER = (data) => {
    return {
        fullName : data.order.buyer.profile.fullName,
        title: data.artwork.title,
        recipientId: data.order.seller.profile._id,
        tumbnail: data.order.buyer.profile.displayPicture
    }
}