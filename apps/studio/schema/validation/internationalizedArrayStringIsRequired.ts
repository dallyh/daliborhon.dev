import { type Rule } from "sanity";

export const internationalizedArrayIsRequired = (rule: Rule) =>
    rule.custom<{ value: string; _type: string; _key: string }[]>((value) => {
        if (!value) {
            return "Field is required";
        }

        const invalidItems = value.filter((item) => item.value === undefined);

        if (invalidItems.length) {
            return invalidItems.map((item) => ({
                message: `Field is required.`,
                path: [{ _key: item._key }, "value"],
            }));
        }

        return true;
    });
