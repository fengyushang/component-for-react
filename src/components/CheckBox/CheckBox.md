## API

```html
<CheckBox
                    options={[
                        {label:"选项1",value:"0",disabled:false},
                        {label:"选项2",value:"1",disabled:false},
                    ]}
                    name='checkbox'
                    onChange={(name,value)=>{ console.log(name,value) }}
                    allCheck
                />
```

| 参数 | 说明 | 类型 | 默认值 | 必需 |
| --- | --- | --- | --- | --- |
| name | 名称 | string | - | 是 |
| value | 值 | string | - | 是 |
| onChange | 点击选择时的回调，参数是name和value | Function(name, value) | - | 是 |
| options | 内部：label(名称),value(值),disabled(不可点击状态) | array | '' | 是 |
| allCheck | 全选按钮是否存在 | bool | false | 否 |

