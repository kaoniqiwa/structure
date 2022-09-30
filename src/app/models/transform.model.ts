import { TransformationType, TransformFnParams } from 'class-transformer';
import { formatDate } from '@angular/common';

export function transformDateTime(params: TransformFnParams) {
  if (params.value === undefined || params.value === null) return undefined;
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return (params.value as Date).toISOString();
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformDate(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'yyyy-MM-dd', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}
export function transformTime(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value);
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return formatDate(params.value as Date, 'HH!:mm!:ss', 'en');
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value);
  } else {
    return '';
  }
}

export function transformParams(params: TransformFnParams) {
  if (params.type === TransformationType.CLASS_TO_PLAIN) {
    switch (params.value) {
      case 'unknown':
        return undefined;
      case 'yes':
        return true;
      case 'no':
        return false;
      default:
        return params.value;
    }
  } else if (params.type === TransformationType.PLAIN_TO_CLASS) {
    switch (params.value) {
    }
  } else {
    return params.value;
  }
}
export function transformKeyValue(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    switch (params.value) {
      case 'unknown':
        return undefined;
      case 'yes':
        return true;
      case 'no':
        return false;
      default:
        return params.value;
    }
  }
  return params.value;
}
