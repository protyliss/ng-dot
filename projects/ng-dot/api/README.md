# @ng-dot/api

REST API Design Pattern

## Declare APIs
```typescript
import {Injectable} from '@angular/core';
import {ApiRoot} from '@ng-dot/api';

@Injectable()
class FooService {
    // REST API Root
    readonly root = new ApiRoot('/articles');
    
    // POST /articles
    $create = this.root.post();
    
    // GET /articles/:id
    $read = this.root.get('/:id');

    
    // PUT /articles/:id
    $update = this.$read.put();
    
    // DELETE /articles/:id
    $delete  = this.$read.delete()
}
```

### Extend Model
```typescript
import {Injectable} from '@angular/core';
import {ApiRoot} from '@ng-dot/api';

interface ArticlePost {
    name: string;
    subject: string;
    content: string; 
}

interface ArticlePath {
    id: number | string;
}

interface Article extends ArticlePost {
    id: number;
}

@Injectable()
class FooService {
    readonly root = new ApiRoot('/articles');
    
    // worker body interface as `ArticlePost`
    $create = this.root.post<null, ArticlePost>();
    
    // worker path interface as `ArticlePath`
    // worker response interface as `Article`
    $read = this.root.get<ArticlePath, Article>('/:id');
    
    // worker path interface same with `read$`
    // worker body and response as `Article`
    $update = this.$read.put<null, Article, Article>();
    
    $delete  = this.$read.delete()
}
```

## Request
```typescript
class FooComponent {
    constructor(_foo: FooService) {
        // create _request
        _foo.read$.request({id: 1})
            // Observable<RESPONSE>
            .subscribe(article => {
                this.article = article; 
            });
    }
}
```
