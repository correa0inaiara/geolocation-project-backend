import { mongoose } from '@typegoose/typegoose';
import { isObjectID, isValid } from '../utils';
import { log } from '../logs';
import { i18n } from '../i18n';

export const isUserValid = function (
  this: mongoose.Document,
  address: string,
  location: mongoose.Types.ObjectId,
) {
  let message: string = '';

  if (isValid(location) && !isObjectID(location)) {
    message = i18n.getTranslatedText('api.user.validation.location');
    log.error({ api: message });
    this.invalidate('location', message, location);
  }

  if (isValid(address) && typeof address != 'string') {
    message = i18n.getTranslatedText('api.user.validation.address');
    log.error({ api: message });
    this.invalidate('address', message, address);
  }

  if ((!isValid(address) && !isObjectID(location)) || (isValid(address) && isObjectID(location))) {
    message = i18n.getTranslatedText('api.user.validation.schema');
    log.error({ api: message });
    this.invalidate('address', message, address);
    this.invalidate('location', message, location);
  }
};
