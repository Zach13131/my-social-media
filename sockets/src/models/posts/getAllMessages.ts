import { Chat } from './entities/chat.entity';

const getAllMessages = async (Repository, data): Promise<Chat[]> => {
  const { fromUser, toUser } = data;

  const allMessages1 = await Repository.createQueryBuilder('chat')
    .where('chat.fromUser = :fromUser', { fromUser: fromUser })
    .andWhere('chat.toUser = :toUser', { toUser: toUser })
    .orderBy('chat.createdAt', 'DESC')
    .getMany();

  const allMessages2 = await Repository.createQueryBuilder('chat')
    .where('chat.fromUser = :fromUser', { fromUser: toUser })
    .andWhere('chat.toUser = :toUser', { toUser: fromUser })
    .orderBy('chat.createdAt', 'DESC')
    .getMany();

  const allMessages = [...allMessages1, ...allMessages2];

  const sortedMessages = allMessages.sort(
    (a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(),
  );
  return sortedMessages;
};

export default getAllMessages;
