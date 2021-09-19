import { createLocalVue, mount } from '@vue/test-utils';
import YouTubeWidget from '../../src/components/YouTubeWidget.vue';

const mockData = {
    apiKey: 'yourapikey',
    channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ',
    resultsPerRequest: 1,
    subscribersCountText: "подписчиков",
    subscribeBtnText: "Подписаться",
    loadMoreBtnText: "Загрузить еще",
    httpResponse: {
        data: {
            items: [
                {
                    id: {
                        videoId: '1'
                    },
                    snippet: {
                        thumbnails: {
                            default: {
                                url: 'avatar-url'
                            }
                        },
                        localized: {
                            title: 'NASA'
                        }
                    },
                    statistics: {
                        subscriberCount: 100,
                        videoCount: 100
                    }
                }
            ],
            nextPageToken: 'E7GFKSDGKLF22f'
        }
    }
};

jest.mock('axios', () => ({
    get: () => Promise.resolve(mockData.httpResponse)
}));

describe('YouTubeWidget.vue', () => {
    const vueInstance = createLocalVue();

    const wrapper = mount(YouTubeWidget, {
        vueInstance,
        propsData: {
            apiKey: mockData.apiKey,
            channelId: mockData.channelId,
            resultsPerRequest: mockData.resultsPerRequest,
            subscribersCountText: mockData.subscribersCountText,
            subscribeBtnText: mockData.subscribeBtnText,
            loadMoreBtnText: mockData.loadMoreBtnText
        }
    });

    it('initialized correctly', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper.is(YouTubeWidget)).toBe(true);
    });

    it('renders props when passed', () => {
        expect(wrapper.props().apiKey).toBe(mockData.apiKey);
        expect(wrapper.props().channelId).toBe(mockData.channelId);
        expect(wrapper.props().resultsPerRequest).toBe(mockData.resultsPerRequest);
        expect(wrapper.props().subscribersCountText).toBe(mockData.subscribersCountText);
        expect(wrapper.props().subscribeBtnText).toBe(mockData.subscribeBtnText);
        expect(wrapper.props().loadMoreBtnText).toBe(mockData.loadMoreBtnText);

        expect(wrapper.find('.youtube-widget__subscribe-btn').attributes('href')).toEqual('http://www.youtube.com/channel/' + mockData.channelId + '?sub_confirmation=1');
        expect(wrapper.find('.youtube-widget__subscribe-btn').text()).toEqual(mockData.subscribeBtnText);
        expect(wrapper.find('.youtube-widget__load-more-btn').text()).toEqual(mockData.loadMoreBtnText);
    });

    it("fetches channel avatar src", async () => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.channelAvatar).toEqual(mockData.httpResponse.data["items"][0].snippet.thumbnails.default.url);
            expect(wrapper.find('.youtube-widget__logo').attributes('src')).toEqual(mockData.httpResponse.data["items"][0].snippet.thumbnails.default.url);
        })
    });

    it("fetches channel title", async () => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.channelTitle).toEqual(mockData.httpResponse.data["items"][0].snippet.localized.title);
            expect(wrapper.find('.youtube-widget__title').text()).toEqual(mockData.httpResponse.data["items"][0].snippet.localized.title);
        })
    });

    it("fetches channel subscribers count", async () => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.subscribersCount).toEqual(mockData.httpResponse.data["items"][0].statistics.subscriberCount);
            expect(wrapper.find('.youtube-widget__subscribers-count').text()).toEqual(Number(mockData.httpResponse.data["items"][0].statistics.subscriberCount) + ' ' + mockData.subscribersCountText);
        })
    });

    it("fetches 1 channel video when loaded", async () => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.videos.length).toBe(1);
            expect(wrapper.vm.videos).toEqual(mockData.httpResponse.data.items);
            expect(wrapper.findAll('iframe').length).toBe(1);
        })
    });

    it('calls "loadMore" method after click on "Load More" button and fetches one more video', async () => {
        const loadMoreBtn = wrapper.find(".youtube-widget__load-more-btn");
        await loadMoreBtn.trigger("click");

        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.videos.length).toBe(2);
            expect(wrapper.findAll('iframe').length).toBe(2);
        })
    });
});
