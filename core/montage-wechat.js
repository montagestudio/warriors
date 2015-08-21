var Montage = require("montage/core/core").Montage;

exports.MontageWechat = Montage.specialize({

    constructor: {
        value: function MontageWechat(delegate) {
            this.delegate = delegate;

        }
    },

    delegate: {
        value: null
    },

    registerShareToMoment: {
        value: function (title, link, imgUrl) {
            var self = this;
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgUrl,
                    trigger: function (res) {
                        if (self.hasOwnProperty('onShareTimelineTrigger')) {
                            self['onShareTimelineTrigger'](res);
                        }
                    },
                    success: function (res) {
                        if (self.hasOwnProperty('onShareTimelineSuccess')) {
                            self['onShareTimelineSuccess'](res);
                        }
                    },
                    cancel: function (res) {
                        if (self.hasOwnProperty('onShareTimelineCancel')) {
                            self['onShareTimelineCancel'](res);
                        }
                    },
                    fail: function (res) {
                        if (self.hasOwnProperty('onShareTimelineFail')) {
                            self['onShareTimelineFail'](res);
                        }
                    }
                });
            });

        }
    }

});
