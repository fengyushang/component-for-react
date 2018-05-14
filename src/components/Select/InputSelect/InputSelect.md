##Select

```html
import {InputSelect} from 'components/Select';
    <InputSelect
        name="demo"
            value={demo}
            onChange={this.change}
            placeholder='请输入选项'     
            readOnly={true}                   
            config={{
                options:[{
                    label:'选项A',
                    value:1
                },{
                    label:'选项B',
                    value:2
                }],
            }
            }
        />
```

参数|说明|类型|默认值|是否必需
:----|:----|:----|:----|:----
name|对应下拉组件的名称标识|string|--|是
value|组件的值|string|--|否
onChange|组件选择后回掉参数|func|--|是
placeholder|默认提示文字|string|'请输入选项'|否
readOnly|下拉组件是否可编辑|bool|false|否
config|下拉组件配置项|object|{}|是
