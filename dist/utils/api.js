import { convert } from './index';
export default (ncmb, options) => {
    const { method, endpoint, sessionToken, query } = options;
    const nowTime = new Date().toISOString();
    const signature = ncmb.createSignature({
        method,
        endpoint,
        nowTime,
        query
    });
    const createFetchUrl = () => {
        let fetchUrl = `${ncmb.url}/${endpoint}`;
        if (method === 'GET' && query instanceof Object) {
            fetchUrl += `?${convert(query)}`;
        }
        return fetchUrl;
    };
    const createHeaders = () => {
        const header = {
            'X-NCMB-Application-Key': ncmb.getApplicationKey(),
            'X-NCMB-Timestamp': nowTime,
            'X-NCMB-Signature': signature,
            'Content-Type': 'application/json'
        };
        if (sessionToken) {
            header['X-NCMB-Apps-Session-Token'] = ncmb.getCurrentUser().sessionToken;
        }
        return header;
    };
    const headers = createHeaders();
    const body = method === 'POST' || method === 'PUT' ? JSON.stringify(query) : null;
    return async () => {
        return await fetch(createFetchUrl(), { method, headers, body });
    };
};
//# sourceMappingURL=api.js.map