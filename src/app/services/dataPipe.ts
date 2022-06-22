import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "replaceSubstring" })
export class ReplaceSubstring implements PipeTransform {
  transform(subject: string, substring: string, replacement: string): string {

    //notice the need to instantiate a RegExp object, since passing
    //'substring' directly will NOT work, for example
    //subject.replace(substring, replacement) and
    //subject.replace(`/${substring}/`, replacement) don't work

    return subject.replace(new RegExp(substring), replacement);
  }
}