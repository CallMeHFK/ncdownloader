const Http = class {
    data;
    constructor(url) {
        this.url = url;
        this.method = 'POST';
        this.data = null;
        this.dataType = 'application/json';
        this.xhr = new XMLHttpRequest();
    }
    static getInstance(url) {
        return new Http(url);
    }
    setData(data) {
        this.data = data
        return this
    }
    setDataType($value) {
        this.dataType = $value;
    }
    send() {
        let token = this.getToken();
        this.xhr.open(this.method, this.url);
        this.xhr.setRequestHeader('requesttoken', token)
        this.xhr.setRequestHeader('OCS-APIREQUEST', 'true')
        if (this.dataType)
            this.xhr.setRequestHeader('Content-Type', this.dataType);
        let callback = this.handler;
        this.xhr.onload = () => {
            if (typeof callback === 'function')
                callback(JSON.parse(this.xhr.response));
        }
        this.xhr.onerror = this.errorHandler;
        this.xhr.send(JSON.stringify(this.data));
    }
    getToken() {
        return document.getElementsByTagName('head')[0].getAttribute('data-requesttoken')
    }
    setUrl(url) {
        this.url = url
        return this
    }
    setMethod(method) {
        this.method = method
        return this
    }
    setHandler(handler) {
        this.handler = handler || function (data) { };
        return this;
    }
    setErrorHandler(handler) {
        this.errorHandler = handler
        return this;
    }
    upload(file) {
        const fd = new FormData();
        this.xhr.open(this.method, this.url, true);
        let callback = this.handler;
        this.xhr.onload = () => {
            if (typeof callback === 'function')
                callback(JSON.parse(this.xhr.response));
        }
        fd.append('torrentfile', file);
        return this.xhr.send(fd);
    }
}

export default Http