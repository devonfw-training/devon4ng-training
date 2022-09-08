import { Speaker } from './speaker';
import { HelloService } from './hello.service';

let speakerSpy: Speaker;
let sut: HelloService;
describe('HelloService', () => {
  beforeEach(() => {
    speakerSpy = jasmine.createSpyObj<Speaker>(['speak']);
    sut = new HelloService(speakerSpy);
  });

  describe('say', () => {
    it('should call Speaker', () => {
      // Given
      const speechLine = 'This is Sparta!';

      // When
      sut.say(speechLine);

      // Then
      expect(speakerSpy.speak).toHaveBeenCalledWith(speechLine);
    });
  });
});
