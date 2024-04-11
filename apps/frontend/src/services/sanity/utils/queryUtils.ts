import { q } from "groqd";

export function getLocalizedArrayQuery(field: string) {
    return q(field).filter("_key == $language").slice(0).grabOne("value", q.string());
}
