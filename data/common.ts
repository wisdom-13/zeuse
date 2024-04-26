import { Eye, Globe, Lock } from 'lucide-react';

export const postRole = [
  {
    id: 0,
    name: '전체 공개',
    icon: Globe
  },
  {
    id: 1,
    name: '비공개',
    icon: Eye
  },
  {
    id: 9,
    name: '암호 설정',
    icon: Lock
  },
];

export const boardTypes = {
  post: {
    type: 'post',
    name: '포스트형',
  },
  memo: {
    type: 'memo',
    name: '메모형',
  },
  link: {
    type: 'link',
    name: '외부링크',
  },
  trpg: {
    type: 'trpg',
    name: 'TRPG',
  },
};

export const viewTypes = {
  list: {
    type: 'list',
    name: '리스트형'
  },
  card: {
    type: 'card',
    name: '카드형'
  },
}
