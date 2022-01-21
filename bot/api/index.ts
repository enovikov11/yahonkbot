export function getVariableValues(): {[key: string]: string}  {

}

export function* getUpdate() {

}

export function changeTitle(oldTitle: string, newTitle: string) {

}

export function checkPremium(userId: number): boolean {

}

type Premium = 'yes' | 'no' | 'any';

type SendableVariant = {
    message: string;
    weight: number;
    premium: Premium;
}

type SendableItem = SendableVariant[];

// FIXME разделить отправку и выбор
// FIXME нормально обрабатывать когда нет выбора

export function send(item: SendableItem, replyTo: number, ){

}