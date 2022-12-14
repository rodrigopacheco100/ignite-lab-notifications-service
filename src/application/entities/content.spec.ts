import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma nova solicitação de amizade');

    expect(content).toBeTruthy();
    expect(content.value).toBe('Você recebeu uma nova solicitação de amizade');
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Dale')).toThrowError();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrowError();
  });
});
