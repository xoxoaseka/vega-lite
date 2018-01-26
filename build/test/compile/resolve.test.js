"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var resolve_1 = require("../../src/compile/resolve");
var log = require("../../src/log");
var util_1 = require("../util");
describe('compile/resolve', function () {
    describe('defaultScaleResolve', function () {
        it('shares scales for layer model by default.', function () {
            var model = util_1.parseLayerModel({
                layer: []
            });
            chai_1.assert.equal(resolve_1.defaultScaleResolve('x', model), 'shared');
        });
        it('shares scales for facet model by default.', function () {
            var model = util_1.parseFacetModel({
                facet: {
                    row: { field: 'a', type: 'nominal' }
                },
                spec: { mark: 'point', encoding: {} }
            });
            chai_1.assert.equal(resolve_1.defaultScaleResolve('x', model), 'shared');
        });
        it('separates xy scales for concat model by default.', function () {
            var model = util_1.parseConcatModel({
                hconcat: []
            });
            chai_1.assert.equal(resolve_1.defaultScaleResolve('x', model), 'independent');
        });
        it('shares non-xy scales for concat model by default.', function () {
            var model = util_1.parseConcatModel({
                hconcat: []
            });
            chai_1.assert.equal(resolve_1.defaultScaleResolve('color', model), 'shared');
        });
        it('separates xy scales for repeat model by default.', function () {
            var model = util_1.parseRepeatModel({
                repeat: {
                    row: ['a', 'b']
                },
                spec: {
                    mark: 'point',
                    encoding: {
                        x: { field: { repeat: 'row' }, type: 'quantitative' },
                        color: { field: 'color', type: 'quantitative' }
                    }
                }
            });
            chai_1.assert.equal(resolve_1.defaultScaleResolve('x', model), 'independent');
        });
        it('shares non-xy scales for repeat model by default.', function () {
            var model = util_1.parseRepeatModel({
                repeat: {
                    row: ['a', 'b']
                },
                spec: {
                    mark: 'point',
                    encoding: {
                        x: { field: { repeat: 'row' }, type: 'quantitative' },
                        color: { field: 'color', type: 'quantitative' }
                    }
                }
            });
            chai_1.assert.equal(resolve_1.defaultScaleResolve('color', model), 'shared');
        });
    });
    describe('parseGuideResolve', function () {
        it('shares axis for a shared scale by default', function () {
            var axisResolve = resolve_1.parseGuideResolve({
                scale: { x: 'shared' },
                axis: {}
            }, 'x');
            chai_1.assert.equal(axisResolve, 'shared');
        });
        it('separates axis for a shared scale if specified', function () {
            var axisResolve = resolve_1.parseGuideResolve({
                scale: { x: 'shared' },
                axis: { x: 'independent' }
            }, 'x');
            chai_1.assert.equal(axisResolve, 'independent');
        });
        it('separates legend for a shared scale if specified', function () {
            var legendResolve = resolve_1.parseGuideResolve({
                scale: { color: 'shared' },
                legend: { color: 'independent' }
            }, 'color');
            chai_1.assert.equal(legendResolve, 'independent');
        });
        it('separates axis for an independent scale by default', function () {
            var axisResolve = resolve_1.parseGuideResolve({
                scale: { x: 'independent' },
                axis: {}
            }, 'x');
            chai_1.assert.equal(axisResolve, 'independent');
        });
        it('separates axis for an independent scale even "shared" is specified and throw warning', log.wrap(function (localLogger) {
            var axisResolve = resolve_1.parseGuideResolve({
                scale: { x: 'independent' },
                axis: { x: 'shared' }
            }, 'x');
            chai_1.assert.equal(axisResolve, 'independent');
            chai_1.assert.equal(localLogger.warns[0], log.message.independentScaleMeansIndependentGuide('x'));
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC9jb21waWxlL3Jlc29sdmUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QjtBQUM1QixxREFBaUY7QUFDakYsbUNBQXFDO0FBQ3JDLGdDQUE2RjtBQUU3RixRQUFRLENBQUMsaUJBQWlCLEVBQUU7SUFDMUIsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtZQUM5QyxJQUFNLEtBQUssR0FBRyxzQkFBZSxDQUFDO2dCQUM1QixLQUFLLEVBQUUsRUFBRTthQUNWLENBQUMsQ0FBQztZQUNILGFBQU0sQ0FBQyxLQUFLLENBQUMsNkJBQW1CLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO1lBQzlDLElBQU0sS0FBSyxHQUFHLHNCQUFlLENBQUM7Z0JBQzVCLEtBQUssRUFBRTtvQkFDTCxHQUFHLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7aUJBQ25DO2dCQUNELElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQzthQUNwQyxDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsS0FBSyxDQUFDLDZCQUFtQixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtZQUNyRCxJQUFNLEtBQUssR0FBRyx1QkFBZ0IsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLEVBQUU7YUFDWixDQUFDLENBQUM7WUFDSCxhQUFNLENBQUMsS0FBSyxDQUFDLDZCQUFtQixDQUFDLEdBQUcsRUFBRSxLQUFL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T0FBTyxDQUFDLENBQUM7WUFDWixhQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxvREFBb0QsRUFBRTtZQUN2RCxJQUFNLFdBQVcsR0FBRywyQkFBaUIsQ0FBQztnQkFDcEMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBQztnQkFDekIsSUFBSSxFQUFFLEVBQUU7YUFDVCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsYUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsc0ZBQXNGLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFDLFdBQVc7WUFDOUcsSUFBTSxXQUFXLEdBQUcsMkJBQWlCLENBQUM7Z0JBQ3BDLEtBQUssRUFBRSxFQUFDLENBQUMsRUFBRSxhQUFhLEVBQUM7Z0JBQ3pCLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxRQUFRLEVBQUM7YUFDcEIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3pDLGFBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0YsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Fzc2VydH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge2RlZmF1bHRTY2FsZVJlc29sdmUsIHBhcnNlR3VpZGVSZXNvbHZlfSBmcm9tICcuLi8uLi9zcmMvY29tcGlsZS9yZXNvbHZlJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9zcmMvbG9nJztcbmltcG9ydCB7cGFyc2VDb25jYXRNb2RlbCwgcGFyc2VGYWNldE1vZGVsLCBwYXJzZUxheWVyTW9kZWwsIHBhcnNlUmVwZWF0TW9kZWx9IGZyb20gJy4uL3V0aWwnO1xuXG5kZXNjcmliZSgnY29tcGlsZS9yZXNvbHZlJywgKCkgPT4ge1xuICBkZXNjcmliZSgnZGVmYXVsdFNjYWxlUmVzb2x2ZScsICgpID0+IHtcbiAgICBpdCgnc2hhcmVzIHNjYWxlcyBmb3IgbGF5ZXIgbW9kZWwgYnkgZGVmYXVsdC4nLCAoKSA9PiB7XG4gICAgICBjb25zdCBtb2RlbCA9IHBhcnNlTGF5ZXJNb2RlbCh7XG4gICAgICAgIGxheWVyOiBbXVxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZGVmYXVsdFNjYWxlUmVzb2x2ZSgneCcsIG1vZGVsKSwgJ3NoYXJlZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NoYXJlcyBzY2FsZXMgZm9yIGZhY2V0IG1vZGVsIGJ5IGRlZmF1bHQuJywgKCkgPT4ge1xuICAgICAgY29uc3QgbW9kZWwgPSBwYXJzZUZhY2V0TW9kZWwoe1xuICAgICAgICBmYWNldDoge1xuICAgICAgICAgIHJvdzoge2ZpZWxkOiAnYScsIHR5cGU6ICdub21pbmFsJ31cbiAgICAgICAgfSxcbiAgICAgICAgc3BlYzoge21hcms6ICdwb2ludCcsIGVuY29kaW5nOiB7fX1cbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmVxdWFsKGRlZmF1bHRTY2FsZVJlc29sdmUoJ3gnLCBtb2RlbCksICdzaGFyZWQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXBhcmF0ZXMgeHkgc2NhbGVzIGZvciBjb25jYXQgbW9kZWwgYnkgZGVmYXVsdC4nLCAoKSA9PiB7XG4gICAgICBjb25zdCBtb2RlbCA9IHBhcnNlQ29uY2F0TW9kZWwoe1xuICAgICAgICBoY29uY2F0OiBbXVxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZGVmYXVsdFNjYWxlUmVzb2x2ZSgneCcsIG1vZGVsKSwgJ2luZGVwZW5kZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hhcmVzIG5vbi14eSBzY2FsZXMgZm9yIGNvbmNhdCBtb2RlbCBieSBkZWZhdWx0LicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gcGFyc2VDb25jYXRNb2RlbCh7XG4gICAgICAgIGhjb25jYXQ6IFtdXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5lcXVhbChkZWZhdWx0U2NhbGVSZXNvbHZlKCdjb2xvcicsIG1vZGVsKSwgJ3NoYXJlZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlcGFyYXRlcyB4eSBzY2FsZXMgZm9yIHJlcGVhdCBtb2RlbCBieSBkZWZhdWx0LicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gcGFyc2VSZXBlYXRNb2RlbCh7XG4gICAgICAgIHJlcGVhdDoge1xuICAgICAgICAgIHJvdzogWydhJywgJ2InXVxuICAgICAgICB9LFxuICAgICAgICBzcGVjOiB7XG4gICAgICAgICAgbWFyazogJ3BvaW50JyxcbiAgICAgICAgICBlbmNvZGluZzoge1xuICAgICAgICAgICAgeDoge2ZpZWxkOiB7cmVwZWF0OiAncm93J30sIHR5cGU6ICdxdWFudGl0YXRpdmUnfSxcbiAgICAgICAgICAgIGNvbG9yOiB7ZmllbGQ6ICdjb2xvcicsIHR5cGU6ICdxdWFudGl0YXRpdmUnfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZGVmYXVsdFNjYWxlUmVzb2x2ZSgneCcsIG1vZGVsKSwgJ2luZGVwZW5kZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hhcmVzIG5vbi14eSBzY2FsZXMgZm9yIHJlcGVhdCBtb2RlbCBieSBkZWZhdWx0LicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsID0gcGFyc2VSZXBlYXRNb2RlbCh7XG4gICAgICAgIHJlcGVhdDoge1xuICAgICAgICAgIHJvdzogWydhJywgJ2InXVxuICAgICAgICB9LFxuICAgICAgICBzcGVjOiB7XG4gICAgICAgICAgbWFyazogJ3BvaW50JyxcbiAgICAgICAgICBlbmNvZGluZzoge1xuICAgICAgICAgICAgeDoge2ZpZWxkOiB7cmVwZWF0OiAncm93J30sIHR5cGU6ICdxdWFudGl0YXRpdmUnfSxcbiAgICAgICAgICAgIGNvbG9yOiB7ZmllbGQ6ICdjb2xvcicsIHR5cGU6ICdxdWFudGl0YXRpdmUnfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZXF1YWwoZGVmYXVsdFNjYWxlUmVzb2x2ZSgnY29sb3InLCBtb2RlbCksICdzaGFyZWQnKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNlR3VpZGVSZXNvbHZlJywgKCkgPT4ge1xuICAgIGl0KCdzaGFyZXMgYXhpcyBmb3IgYSBzaGFyZWQgc2NhbGUgYnkgZGVmYXVsdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGF4aXNSZXNvbHZlID0gcGFyc2VHdWlkZVJlc29sdmUoe1xuICAgICAgICBzY2FsZToge3g6ICdzaGFyZWQnfSxcbiAgICAgICAgYXhpczoge31cbiAgICAgIH0sICd4Jyk7XG4gICAgICBhc3NlcnQuZXF1YWwoYXhpc1Jlc29sdmUsICdzaGFyZWQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXBhcmF0ZXMgYXhpcyBmb3IgYSBzaGFyZWQgc2NhbGUgaWYgc3BlY2lmaWVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgYXhpc1Jlc29sdmUgPSBwYXJzZUd1aWRlUmVzb2x2ZSh7XG4gICAgICAgIHNjYWxlOiB7eDogJ3NoYXJlZCd9LFxuICAgICAgICBheGlzOiB7eDogJ2luZGVwZW5kZW50J31cbiAgICAgIH0sICd4Jyk7XG4gICAgICBhc3NlcnQuZXF1YWwoYXhpc1Jlc29sdmUsICdpbmRlcGVuZGVudCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlcGFyYXRlcyBsZWdlbmQgZm9yIGEgc2hhcmVkIHNjYWxlIGlmIHNwZWNpZmllZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGxlZ2VuZFJlc29sdmUgPSBwYXJzZUd1aWRlUmVzb2x2ZSh7XG4gICAgICAgIHNjYWxlOiB7Y29sb3I6ICdzaGFyZWQnfSxcbiAgICAgICAgbGVnZW5kOiB7Y29sb3I6ICdpbmRlcGVuZGVudCd9XG4gICAgICB9LCAnY29sb3InKTtcbiAgICAgIGFzc2VydC5lcXVhbChsZWdlbmRSZXNvbHZlLCAnaW5kZXBlbmRlbnQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZXBhcmF0ZXMgYXhpcyBmb3IgYW4gaW5kZXBlbmRlbnQgc2NhbGUgYnkgZGVmYXVsdCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGF4aXNSZXNvbHZlID0gcGFyc2VHdWlkZVJlc29sdmUoe1xuICAgICAgICBzY2FsZToge3g6ICdpbmRlcGVuZGVudCd9LFxuICAgICAgICBheGlzOiB7fVxuICAgICAgfSwgJ3gnKTtcbiAgICAgIGFzc2VydC5lcXVhbChheGlzUmVzb2x2ZSwgJ2luZGVwZW5kZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VwYXJhdGVzIGF4aXMgZm9yIGFuIGluZGVwZW5kZW50IHNjYWxlIGV2ZW4gXCJzaGFyZWRcIiBpcyBzcGVjaWZpZWQgYW5kIHRocm93IHdhcm5pbmcnLCBsb2cud3JhcCgobG9jYWxMb2dnZXIpID0+IHtcbiAgICAgIGNvbnN0IGF4aXNSZXNvbHZlID0gcGFyc2VHdWlkZVJlc29sdmUoe1xuICAgICAgICBzY2FsZToge3g6ICdpbmRlcGVuZGVudCd9LFxuICAgICAgICBheGlzOiB7eDogJ3NoYXJlZCd9XG4gICAgICB9LCAneCcpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGF4aXNSZXNvbHZlLCAnaW5kZXBlbmRlbnQnKTtcbiAgICAgIGFzc2VydC5lcXVhbChsb2NhbExvZ2dlci53YXJuc1swXSwgbG9nLm1lc3NhZ2UuaW5kZXBlbmRlbnRTY2FsZU1lYW5zSW5kZXBlbmRlbnRHdWlkZSgneCcpKTtcbiAgICB9KSk7XG4gIH0pO1xufSk7XG4iXX0=