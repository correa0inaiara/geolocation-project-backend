import { mongoose } from '@typegoose/typegoose';
import { isObjectID, isValid } from '../utils';
import { log } from '../logs';
import { i18n } from '../i18n';

export const isRegionValid = function (
  this: mongoose.Document,
  name: string,
  user: mongoose.Types.ObjectId,
  location: mongoose.Types.ObjectId,
) {
  let message: string = '';

  if (!isValid(name)) {
    message = i18n.getTranslatedText('api.region.validation.location.name');
    log.error({ api: message });
    this.invalidate('name', message, name);
  }

  if (!isObjectID(user)) {
    message = i18n.getTranslatedText('api.region.validation.userRequired');
    log.error({ api: message });
    this.invalidate('user', message, user);
  }

  if (!isObjectID(location)) {
    message = i18n.getTranslatedText('api.region.validation.location.required');
    log.error({ api: message });
    this.invalidate('location', message, location);
  }
};
