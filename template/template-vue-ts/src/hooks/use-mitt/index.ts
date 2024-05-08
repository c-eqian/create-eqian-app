import mitt from 'mitt';

import { EMIT_ENUM } from '@/constant';

type Events = {
    [EMIT_ENUM.TEST]: string;
};
export const useEmitter = mitt<Events>();
