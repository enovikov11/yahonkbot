// /v1/fit

type Unixtime = number;

type User = {
    fullname: string;
    login: string;
    uid: number;
}

type Title = {
    title: string;
    timestamp: Unixtime;
    actor: User;
}

type FitInput = {
    titles: Title[];
}

type FitOutput = null | { used: number; }

// /v1/render

type RenderInput = {
    titles: Title[];
}

type Png = any;

type RenderOutput = Png;