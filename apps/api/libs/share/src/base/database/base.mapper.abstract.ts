export abstract class BaseMapper<X, Y> {
  abstract toDomain(raw: X): Y;

  abstract toPersistance(doc: Y): X;
}
