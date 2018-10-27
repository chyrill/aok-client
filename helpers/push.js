/* eslint-disable */

import { API_ROUTE } from '@/config/routes'

const publicVapidKey = 'BO1o2k-tgB-we89fa6FjPkBZRBEQH_LbDWBh6d1ES3smZVjdWt0-ACyV96AuZnSZUE6xHvrwN0lxddcanPKVLSk'

const urlBase64ToUint8Array = (base64string) => {
    const padding = '='.repeat((4 - base64string.length % 4) % 4)
    const base64 = (base64string + padding)
        .replace(/\-/g, '+')
        .replace(/_/g,'/')
    const rawData = window.atob(base64)
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

export const PushManager = () => {
   if('serviceWorker' in navigator) {
       console.log('Registering service worker.')

       run().catch(err => { console.log(err)})
   }
}

async function run() {
    const registration = await navigator.serviceWorker.register('/push_service.js')
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })

    fetch(API_ROUTE + '/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
}