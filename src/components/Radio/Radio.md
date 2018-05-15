## API

```html
<Radio name='radio' value='radio'   onChange={onChange} config={{
    options:[
        {label:'1',value:'1'},
        {label:'2',value:'2'}
    ]
}}/>
```

| 参数 | 说明 | 类型 | 默认值 | 必需 |
| --- | --- | --- | --- | --- |
| name | 名称 | string | - | 是 |
| value | 值 | string | - | 是 |
| onChange | 点击选择时的回调，参数是name和value | Function(name, value) | - | 是 |
| config | 单选项，内部options是一个数组 | object | '' | 是 |
| disabled | 不可点击状态 | boolean | false | 否 |
