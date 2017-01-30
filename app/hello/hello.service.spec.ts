import { Speaker } from './speaker';
import { HelloService } from './hello.service';

const speakerFake = {
  speak: (v: string) => {}
} as Speaker;
let sut: HelloService;

describe('HelloService', () => {
  beforeEach(() => {
    sut = new HelloService(speakerFake);
  });

  describe('say', () => {
    it('should call Speaker', () => {
      // Given
      const speechLine = 'This is Sparta!';
      spyOn(speakerFake, 'speak');

      // When
      sut.say(speechLine);

      // Then
      expect(speakerFake.speak).toHaveBeenCalledWith(speechLine);
    });
  });
});
